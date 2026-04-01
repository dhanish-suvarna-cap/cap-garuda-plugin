# Form State

## Approach: Manual useState + Ant Design Form Components

No form library (Formik, React Hook Form) is used. Forms are built manually.

### Pattern

```javascript
const FormComponent = ({ intl: { formatMessage } }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'default',
  });

  const [errors, setErrors] = useState({});

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      dispatch(submitAction(formData));
    }
  };

  return (
    <div>
      <CapInput
        value={formData.name}
        onChange={e => handleFieldChange('name', e.target.value)}
        className={errors.name ? 'error-border' : ''}
      />
      {errors.name && <span className="error-text">{errors.name}</span>}
      <CapButton onClick={handleSubmit}>
        {formatMessage(messages.save)}
      </CapButton>
    </div>
  );
};
```

### Validation Display

```javascript
// Error border via className
className={trackerNameExistsError ? 'error-border' : ''}

// Error text inline
{errors.name && <CapError>{errors.name}</CapError>}
```

### Form Submission

Forms submit via Redux action dispatch → Saga → API call. The saga callback pattern provides response handling:

```javascript
dispatch(createAction(formData, (response) => {
  if (response.success) {
    showSuccess();
    resetForm();
  }
}));
```

See also: [[05-state/local-state]], [[05-state/decision-tree]]
