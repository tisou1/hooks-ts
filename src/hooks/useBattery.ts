import {useState, useEffect} from 'react'
import { isNavigator, on, off } from '../utils'
import isDeepEqual from '../utils/isDeepEqual'

export interface BatteryState {
  charging: boolean  //是否在充电
  chargingTime: number //电池充满电之前的剩余时间（以秒为单位），如果电池已经充满电，则为 0。
  dischargingTime: number //以秒为单位的剩余时间，直到电池完全放电并且系统将暂停。
  level: number  //当前的电量
}

interface BatteryManager extends Readonly<BatteryState>, EventTarget {
  onchargingchange: () => void;
  onchargingtimechange: () => void;
  ondischargingtimechange: () => void;
  onlevelchange: () => void;
}

interface NavigatorWithPossibleBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

type UseBatteryState =
  | { isSupported: false } // Battery API is not supported
  | { isSupported: true; fetched: false } // battery API supported but not fetched yet
  | (BatteryState & { isSupported: true; fetched: true }); // battery API supported and fetched

const nav: NavigatorWithPossibleBattery | undefined = isNavigator ? navigator : undefined
const isBatteryApiSupported = nav && typeof nav.getBattery === 'function'

//设备不支持时返回的hook
function useBatteryMock(): UseBatteryState {
  return {
    isSupported: false
  }
}


function useBattery(): UseBatteryState {
  const [state, setState] = useState<UseBatteryState>({
    isSupported: true,
    fetched: false
  })


  useEffect(() => {
    let isMounted = true
    let battery: BatteryManager | null = null

    const handleChange = () => {
      if(!isMounted || !battery) {
        return
      }

      const newState: UseBatteryState = {
        isSupported: true,
        fetched: true,
        level: battery.level,
        charging: battery.charging,
        dischargingTime: battery.dischargingTime,
        chargingTime: battery.chargingTime
      }

      !isDeepEqual(state, newState) && setState(newState)
    }

    nav!.getBattery!().then((bat: BatteryManager) => {
      if(!isMounted) {
        return
      }
      battery = bat
      on(battery, 'chargingchange', handleChange);
      on(battery, 'chargingtimechange', handleChange);
      on(battery, 'dischargingtimechange', handleChange);
      on(battery, 'levelchange', handleChange);
      handleChange()
    })

    return () => {
      isMounted = false
      if(battery) {
        off(battery, 'chargingchange', handleChange);
        off(battery, 'chargingtimechange', handleChange);
        off(battery, 'dischargingtimechange', handleChange);
        off(battery, 'levelchange', handleChange);
      }
    }

  },[])


  return state
}


export default isBatteryApiSupported ? useBattery : useBatteryMock