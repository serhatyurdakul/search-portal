import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormHeader from "../components/Header/FormHeader";
import ErrorToast from "../components/ui/Toast/ErrorToast";
import FormInput from "../components/ui/FormInput/FormInput";

const FormPage = () => {
  const dispatch = useDispatch();
  const allData = useSelector((state) => state.search.allData);
  const [errorMessage, setErrorMessage] = useState("");

  const formFields = [
    {
      name: "nameSurname",
      label: "Name Surname",
      placeholder: "Enter name and surname",
      autoFocus: true,
      validation: (value) => {
        const normalized = value.replace(/\s+/g, " ").trim();
        const length = normalized.length;
        const hasOnlyLetters = /^[\p{L}\s]+$/u.test(normalized);
        return {
          isValid: length >= 4 && length <= 60 && hasOnlyLetters,
          error:
            "Name Surname should only contain letters and be between 4-60 characters",
        };
      },
    },
    {
      name: "country",
      label: "Country",
      placeholder: "Enter a country",
      validation: (value) => {
        const normalized = value.replace(/\s+/g, " ").trim();
        const length = normalized.length;
        const hasOnlyLetters = /^[\p{L}\s]+$/u.test(normalized);
        return {
          isValid: length >= 2 && length <= 40 && hasOnlyLetters,
          error:
            "Country should only contain letters and be between 2-40 characters",
        };
      },
    },
    {
      name: "city",
      label: "City",
      placeholder: "Enter a city",
      validation: (value) => {
        const normalized = value.replace(/\s+/g, " ").trim();
        const length = normalized.length;
        const hasOnlyLetters = /^[\p{L}\s]+$/u.test(normalized);
        return {
          isValid: length >= 2 && length <= 40 && hasOnlyLetters,
          error:
            "City should only contain letters and be between 2-40 characters",
        };
      },
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter a e-mail (abc@xyz.com)",
      validation: (value) => {
        const normalized = value.trim();
        return {
          isValid:
            normalized.includes("@") &&
            normalized.includes(".") &&
            normalized.length > 0,
          error: "Please enter a valid email address",
        };
      },
    },
    {
      name: "website",
      label: "Website",
      placeholder: "Enter a website (https://xyz.com)",
      validation: (value) => {
        const normalized = value.trim();
        return {
          isValid:
            (normalized.startsWith("http://") ||
              normalized.startsWith("https://")) &&
            normalized.includes("."),
          error: "Please enter a valid URL (e.g., https://example.com)",
        };
      },
    },
  ];

  const initialFormState = Object.fromEntries(
    formFields.map((field) => [field.name, ""])
  );
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialFormState);

  const validate = (name, value) => {
    if (!value.trim()) {
      return `${
        formFields.find((f) => f.name === name).label
      } field cannot be empty`;
    }

    const field = formFields.find((f) => f.name === name);
    const result = field.validation(value);
    return result.isValid ? "" : result.error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const normalizedValue = value.replace(/\s+/g, " ");

    setFormData((prev) => ({ ...prev, [name]: normalizedValue }));

    const error = validate(name, normalizedValue);
    if (!error) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();

    setFormData((prev) => ({ ...prev, [name]: trimmedValue }));

    const error = validate(name, trimmedValue);
    if (error) {
      setErrorMessage(error);
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasErrors = Object.keys(formData).some((field) => {
      const error = validate(field, formData[field]);
      setErrors((prev) => ({ ...prev, [field]: error }));
      return error;
    });

    if (hasErrors) return;

    const today = new Date();
    const formattedDate = `${
      today.getMonth() + 1
    }/${today.getDate()}/${today.getFullYear()}`;

    const newData = {
      id: Math.max(...allData.map((item) => item.id), 0) + 1,
      ...formData,
      company: "N/A",
      phone: "N/A",
      date: formattedDate,
    };

    dispatch({ type: "search/addData", payload: newData });

    let storage = JSON.parse(localStorage.getItem("combinedData") || "[]");
    storage.push(newData);
    localStorage.setItem("combinedData", JSON.stringify(storage));

    setFormData(initialFormState);
    setErrors(initialFormState);
  };

  const isFormValid =
    Object.values(formData).every((value) => value.trim() !== "") &&
    !Object.values(errors).some((error) => error !== "");

  return (
    <>
      <FormHeader />
      <section className='form'>
        <div className='container'>
          <div className='form-wrapper'>
            <form onSubmit={handleSubmit}>
              {formFields.map((field) => (
                <FormInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  error={errors[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoFocus={field.autoFocus}
                />
              ))}
              <button type='submit' disabled={!isFormValid} className='btn'>
                Add
              </button>
            </form>
          </div>
        </div>
      </section>
      {errorMessage && (
        <ErrorToast
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
    </>
  );
};

export default FormPage;
