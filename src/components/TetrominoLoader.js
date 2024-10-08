import React from 'react'
import classNames from 'classnames'

// Props to: https://codepen.io/imathis/pen/ZYEWrw
export default function TetrominoLoader ({ size, className }) {
  return (
    <div className={classNames('tetrominos', size, className)}>
      <div className="tetromino box1"/>
      <div className="tetromino box2"/>
      <div className="tetromino box3"/>
      <div className="tetromino box4"/>
      <style jsx>{`
        /* Props to: https://codepen.io/imathis/pen/ZYEWrw */

        $w: 64px;
        $h: $w * 1.16625;
        $xspace: $w / 2;
        $yspace: $h/4 - 1;
        $speed: 0.6s;

        .tetrominos {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-$h, -$w);

          &.sm {
            $sizereduction: 0.25;
            transform: translate(-($h * $sizereduction), -($w * $sizereduction)) scale($sizereduction);
          }

          &.xs {
            $sizereduction: 0.16;
            transform: translate(-($h * $sizereduction), -($w * $sizereduction)) scale($sizereduction);
          }
        }

        .tetromino {
          width: $w;
          height: $h;
          position: absolute;
          transition: all ease .3s;
          background: url('data:image/svg+xml;utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 684"%3E%3Cpath fill="%23010101" d="M305.7 0L0 170.9v342.3L305.7 684 612 513.2V170.9L305.7 0z"/%3E%3Cpath fill="%23fff" d="M305.7 80.1l-233.6 131 233.6 131 234.2-131-234.2-131"/%3E%3C/svg%3E') no-repeat top center;
        }

        .box1 {
          animation: tetromino1 $speed ease-out infinite;
        }
        .box2 {
          animation: tetromino2 $speed ease-out infinite;
        }
        .box3 {
          animation: tetromino3 $speed ease-out infinite;
          z-index: 2;
        }
        .box4 {
          animation: tetromino4 $speed ease-out infinite;
        }

        @keyframes tetromino1 {
          0%, 40% {
            /* compose logo *//* 1 on 3 *//* L-shape */
            transform: translate(0,0);
          } 50% {
            /* pre-box */
            transform: translate($xspace,-$yspace);
          } 60%, 100% {
            /* box *//* compose logo */
            transform: translate($xspace*2,0);
          }
        }

        @keyframes tetromino2 {
          0%, 20% {
            /* compose logo *//* 1 on 3 */
            transform: translate($xspace*2, 0px);
          } 40%, 100% {
            /* L-shape *//* box *//* compose logo */
            transform: translate($xspace*3, $yspace);
          }
        }

        @keyframes tetromino3 {
          0% {
            /* compose logo */
            transform: translate($xspace*3, $yspace);
          } 20%, 60% {
            /* 1 on 3 *//* L-shape *//* box */
            transform: translate($xspace*2, $yspace*2);
          } 90%, 100% {
            /* compose logo */
            transform: translate($xspace, $yspace);
          }
        }

        @keyframes tetromino4 {
          0%, 60% {
            /* compose logo *//* 1 on 3 *//* L-shape *//* box */
            transform: translate($xspace, $yspace);
          } 90%, 100% {
            /* compose logo */
            transform: translate(0, 0);
          }
        }
      `}</style>
    </div>
  )
}
