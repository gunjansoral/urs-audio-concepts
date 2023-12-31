import "./style.css";
import { useField } from "formik";
export default function LoginInput({ placeholder, ...props }) {
    const [field, meta] = useField(props);

    return (
        <div className="input_wrap">
            <input
                className={meta.touched && meta.error ? "input_error_border" : ""}
                type={field.type}
                name={field.name}
                placeholder={placeholder}
                {...field}
                {...props}
            />
        </div>
    );
}
