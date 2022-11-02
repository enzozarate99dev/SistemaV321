import { Field, useFormikContext } from "formik";
import ReactMarkdown from "react-markdown";
import './FormGroupMarkdown.css'

export default function FormGroupMarkdown(props: formGroupMarkdownProps) {

    const { values } = useFormikContext<any>()

    return (
        <div className="form-group form-markdown">
            <div>
                <label>{props.label}</label>
                <div>
                    <Field name={props.campo} as="textarea" className="form-textarea" />
                </div>
            </div>
        </div>
    )
}

interface formGroupMarkdownProps {
    campo: string;
    label: string;
}