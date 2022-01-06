import {useState, useEffect, useMemo, useRef} from 'react'
import useLatest from './useLatest'
import dayjs from 'dayjs'


export type TDate = Date | number | string | undefined
export type Options = {
    targetDate?: TDate;
    interval?: number;
    onEnd?: () => void;
};
export interface FormattedRes {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}
// declare const useCountdown: (options?: Options | undefined) => readonly [number, FormattedRes];



function calcLeft(targetDate?: TDate){
    if(!targetDate){
        return 0
    }
    // let left = new Date(targetDate).getTime() - new Date().getTime()
    let left = dayjs(targetDate).valueOf() - new Date().getTime()

    if(left < 0){
        return 0
    }
    return left
}


function parseMs(milliseconds:number):FormattedRes {
    return  {
        days: Math.floor(milliseconds / 86400000),
        hours: Math.floor(milliseconds / 3600000) % 24,
        minutes: Math.floor(milliseconds / 60000) % 60,
        seconds: Math.floor(milliseconds / 1000) % 60,
        milliseconds: Math.floor(milliseconds) % 1000
    }
  
  };
/**
 * 倒计时,传入时间
 * @param props 
 * @returns 
 */
export default function useCountDown(props?: Options){
    const { targetDate, interval = 1000,onEnd } = props || {}
    const onEndRef = useLatest(onEnd)

    const [timeLeft, setTimeLeft] = useState(()=>{
        return calcLeft(targetDate)
    })


  
    useEffect(()=>{
        if(!targetDate){
            setTimeLeft(0)
            return
        }

        //立即执行一次  
        setTimeLeft(calcLeft(targetDate))
        const timer = setInterval(()=>{
            const targetLeft = calcLeft(targetDate)
            setTimeLeft(targetLeft)
            
            if (targetLeft === 0) {
                clearInterval(timer);
                onEndRef.current?.();
              }
        },interval)


        return ()=> clearInterval(timer)
    },[targetDate, interval, onEndRef])


    const formattedRes = useMemo(()=>{
        return  parseMs(timeLeft);
    },[timeLeft])
    
    return [timeLeft, formattedRes] as const
}

// export default useCountDown