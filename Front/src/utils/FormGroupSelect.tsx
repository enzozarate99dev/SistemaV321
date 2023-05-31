import { ErrorMessage, Field } from "formik";
import MostrarErrorCampo from "./MostrarErrorCampo";

export default function FormGroupSelect(props: FormGroupSelectProps) {
  const optionValues = props.options.map((option) => option.value); // Obtener los valores numéricos de las opciones

  return (
    <div className="form-group">
      {props.label ? <label htmlFor={props.campo}>{props.label}</label> : null}
      <Field onChange={props.onChange} name={props.campo} style={props.style} className="form-control" as="select">
        {optionValues.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </Field>
      <ErrorMessage name={props.campo}>{(mensaje) => <MostrarErrorCampo mensaje={mensaje} />}</ErrorMessage>
    </div>
  );
}

interface FormGroupSelectProps {
  campo: string;
  label?: string;
  options: Option[];
  style?: React.CSSProperties;
  onChange?: () => void;
}

interface Option {
  value: number;
  label: string;
}

FormGroupSelect.defaultProps = {
  style: { borderRadius: "4px", background: "#F8FAFC" },
};
