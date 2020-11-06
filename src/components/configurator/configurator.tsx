import classNames from "classnames";
import React from "react";
import { BsTools } from "react-icons/bs";
import { Size } from "../../models";
import "./configurator.scss";

const Configurator = (props: IProps) => {
  const [isOpen, setOpen] = React.useState(false);
  const [values, setValues] = React.useState<Size>();

  React.useEffect(() => setValues({ ...props.size }), [props.size]);

  return (
    <React.Fragment>
      <button className="open-configuration" onClick={() => setOpen(!isOpen)}>
        <BsTools />
      </button>
      <div className={classNames("configurator", { open: isOpen })}>
        {!props.hideSteps && (
          <div>
            <label>Steps: </label>
            <input
              type="number"
              value={values?.steps || ""}
              onChange={(event) =>
                setValues({ ...values, steps: parseFloat(event.target.value) })
              }
            />
          </div>
        )}
        {!props.hideWidth && (
          <div>
            <label>Width (Min: 5): </label>
            <input
              type="number"
              value={values?.width || ""}
              onChange={(event) =>
                setValues({ ...values, width: parseFloat(event.target.value) })
              }
            />
          </div>
        )}
        {!props.hideHeight && (
          <div>
            <label>Height (Min 5): </label>
            <input
              type="number"
              value={values?.height || ""}
              onChange={(event) =>
                setValues({ ...values, height: parseFloat(event.target.value) })
              }
            />
          </div>
        )}
        <button
          disabled={
            (isNaN(values?.width) && !props.hideWidth) ||
            (values?.width <= 4 && !props.hideWidth) ||
            (values?.height <= 4 && !props.hideHeight) ||
            (isNaN(values?.height) && !props.hideHeight) ||
            (isNaN(values?.steps) && !props.hideSteps)
          }
          onClick={() => {
            setOpen(false);
            props.obSubmit({ ...values });
          }}
        >
          Submit
        </button>
      </div>
    </React.Fragment>
  );
};

export interface IProps {
  size?: Size;
  hideWidth?: boolean;
  hideHeight?: boolean;
  hideSteps?: boolean;
  obSubmit?: (values: Size) => void;
}

export default Configurator;
