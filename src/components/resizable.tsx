import { useEffect, useState } from 'react';
import './resizable.css';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children?: React.ReactNode;  
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [innerWidth, setInnerwidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState<number>(window.innerWidth*0.75);
  useEffect(() => {
    let timer:any;
    const listener = () =>{
      if(timer){
        clearTimeout(timer);
      }
      timer = setTimeout(()=>{
        setInnerwidth(window.innerWidth);
        setInnerHeight(window.innerHeight);
        if(window.innerWidth*75 < width){
          setWidth(window.innerWidth*75)
        }
      },100)
     

    };
    window.addEventListener('resize',listener)
  
    return () => {
      window.removeEventListener('resize',listener)
    }
  }, [])
  
  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      height: Infinity,
      width,
      resizeHandles: ['e'],
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
    };
  }

  return <ResizableBox
   {...resizableProps}
   onResizeStop={(event,data)=>{
       
       setWidth(data.size.width)
   }}
   >{children}</ResizableBox>;
};

export default Resizable;
