import { useState } from "react";

const initialState = {
  name: "",
  email: "",
  countryCode: "+91",
  phone: "",
  age: "",
  range: 50,
  dob: "",
  gender: "",
  terms: false,
};

export default function UserForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.includes("@")) newErrors.email = "Valid email required";

    if (!form.phone || form.phone.length < 7)
      newErrors.phone = "Valid phone number required";

    if (!form.age || form.age < 18) newErrors.age = "Age must be 18+";

    if (!form.dob) newErrors.dob = "Date of birth required";

    if (!form.gender) newErrors.gender = "Select gender";

    if (!form.terms) newErrors.terms = "Accept terms to continue";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const finalData = {
      ...form,
      phone: `${form.countryCode}${form.phone}`,
    };

    console.log("Submitted Data:", finalData);
    alert("Form submitted successfully!");
    setForm(initialState);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>User Registration Form</h2>

      {/* Name */}
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      {errors.name && <p className="error">{errors.name}</p>}

      {/* Email */}
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      {/* Phone */}
      <div className="phone">
        <select
          name="countryCode"
          value={form.countryCode}
          onChange={handleChange}
        >
          <option value="+91">🇮🇳 +91</option>
          <option value="+1">🇺🇸 +1</option>
          <option value="+44">🇬🇧 +44</option>
        </select>

        <input
          name="phone"
          type="tel"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
        />
      </div>
      {errors.phone && <p className="error">{errors.phone}</p>}

      {/* Age */}
      <input
        name="age"
        type="number"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
      />
      {errors.age && <p className="error">{errors.age}</p>}

      {/* Range */}
      <label>
        Satisfaction: {form.range}
        <input
          type="range"
          name="range"
          min="0"
          max="100"
          value={form.range}
          onChange={handleChange}
        />
      </label>

      {/* DOB */}
      <input type="date" name="dob" value={form.dob} onChange={handleChange} />
      {errors.dob && <p className="error">{errors.dob}</p>}

      {/* Gender */}
      <div className="radio">
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={handleChange}
          />
          Male
        </label>

        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={handleChange}
          />
          Female
        </label>
      </div>
      {errors.gender && <p className="error">{errors.gender}</p>}

      {/* Terms */}
      <label className="checkbox">
        <input
          type="checkbox"
          name="terms"
          checked={form.terms}
          onChange={handleChange}
        />
        Accept terms
      </label>
      {errors.terms && <p className="error">{errors.terms}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
