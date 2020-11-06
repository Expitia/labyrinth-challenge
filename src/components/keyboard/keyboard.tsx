import React from "react";

const KeyboardEventHandler = (props: IProps) => {
  const container = React.useRef<HTMLSpanElement>();

  React.useEffect(() => {
    const handleKeyboardEvent = (event) => {
      const { children, handleKeys, onKeyEvent } = props;
      const isBodyEvent = event.target === document.body;
      const isChildrenEvent = container?.current?.contains(event.target);
      const isValidSource = children ? isChildrenEvent : isBodyEvent;
      const keyCode = String.fromCharCode(event.which || event.keyCode);
      const matchedKey = handleKeys.some((item) => item === keyCode);
      if (matchedKey && isValidSource) {
        onKeyEvent(keyCode, event);
        return true;
      }
      return false;
    };
    document?.addEventListener("keydown", handleKeyboardEvent, false);
    return () => {
      document.removeEventListener("keydown", handleKeyboardEvent, false);
    };
  }, []);

  const toPass = { ...props };
  delete toPass.onKeyEvent;
  delete toPass.handleKeys;
  return <span {...toPass} ref={container} />;
};

export interface IProps extends React.HTMLAttributes<HTMLSpanElement> {
  handleKeys?: string[];
  onKeyEvent: (...arg) => void;
}

export default KeyboardEventHandler;
