import * as React from 'react';

/**
 * 原理解析：
 * 
 * 
 *  * React.useEffect
 * 基本上90%的情况下,都应该用这个,这个是在render结束后,你的callback函数执行,但是不会block browser painting,算是某种异步的方式吧,但是class的componentDidMount 和componentDidUpdate是同步的,在render结束后就运行,useEffect在大部分场景下都比class的方式性能更好.

 *  * React.useLayoutEffect
 * 这个是用在处理DOM的时候,当你的useEffect里面的操作需要处理DOM,并且会改变页面的样式,就需要用这个,否则可能会出现出现闪屏问题, useLayoutEffect里面的callback函数会在DOM更新完成后立即执行,但是会在浏览器进行任何绘制之前运行完成,阻塞了浏览器的绘制.

 * 差异比较
源码参照：https://www.jianshu.com/p/412c874c5add
 1. 使用 React.useEffect 的结果：可以清楚的看到有一个一闪而过的方块.
 2. 使用 React.useLayoutEffect 的结果：可以看出,每次刷新,页面基本没变化

 * @codemod
 // import React, { useEffect, useLayoutEffect, useRef } from "react";
 // import TweenMax from "gsap/TweenMax";
 // import './index.less';
 // 
 // const Animate = () => {
 //   const REl = useRef(null);
 //   useEffect(() => {
 //     /*下面这段代码的意思是当组件加载完成后,在0秒的时间内,将方块的横坐标位置移到600px的位置*/
 //     TweenMax.to(REl.current, 0, {x: 600})
 //    }, []);
 //    return (
 //      <div className='animate'>
 //            <div ref={REl} className="square">square</div>
 //        </div>
 //    );
 //  };
 //  
 //  export default Animate;
 /** 
  * 
  * 
 */

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 *
 * @param {function} fn
 */
export default function useEventCallback(fn) {
  const ref = React.useRef(fn);
  useEnhancedEffect(() => {
    ref.current = fn;
  });
  return React.useCallback((...args) => (0, ref.current)(...args), []);
}
