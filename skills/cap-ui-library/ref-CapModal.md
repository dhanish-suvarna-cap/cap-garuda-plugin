# CapModal

**Import**: `import CapModal from '@capillarytech/cap-ui-library/CapModal';`

## Description
A customized modal dialog component that extends Ant Design's Modal component with custom footer styling and localization support.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string |  | Additional CSS class for the modal |
| wrapClassName | string |  | Additional CSS class for the modal wrapper |
| okText | string | OK | Text of the OK button |
| closeText | string | Cancel | Text of the Cancel button |
| cancelButtonType | string | flat | Type of the cancel button. Possible values: 'primary', 'secondary', 'flat' |
| onOk | function(e) | - | Callback when the OK button is clicked |
| onCancel | function(e) | - | Callback when the modal is canceled (by clicking the close button, mask, or Cancel button) |
| afterClose | function() | - | Callback when the modal is closed completely |
| okButtonProps | object | {} | Props to apply to OK button |
| cancelButtonProps | object | {} | Props to apply to Cancel button |
| title | string \| ReactNode | - | The modal dialog's title |
| visible | boolean | False | Whether the modal dialog is visible or not |
| centered | boolean | False | Centered Modal |
| closable | boolean | True | Whether a close (x) button is visible on top right of the modal dialog or not |
| confirmLoading | boolean | False | Whether to apply loading visual effect for OK button or not |
| destroyOnClose | boolean | False | Whether to unmount child components on close |
| footer | string \| ReactNode \| null | None | Footer content, set as null when you don't need default buttons |
| getContainer | HTMLElement \| () => HTMLElement \| Selectors \| false | document.body | The container of the modal dialog |
| mask | boolean | True | Whether show mask or not |
| maskClosable | boolean | True | Whether to close the modal dialog when the mask (area outside the modal) is clicked |
| maskStyle | object | {} | Style for modal's mask element |
| style | object | {} | Style for modal content |
| width | string \| number | 520 | Width of the modal dialog |
| zIndex | number | 1000 | The z-index of the Modal |

## Usage Examples

### Basic Modal with Title and Content
```jsx
import CapModal from '@capillarytech/cap-ui-library/CapModal';
import CapButton from '@capillarytech/cap-ui-library/CapButton';

<CapButton type="primary" onClick={() => setVisible(true)}>Open Modal</CapButton>

<CapModal
  title="Confirm Action"
  visible={visible}
  onOk={handleOk}
  onCancel={handleCancel}
>
  <p>Are you sure you want to proceed?</p>
</CapModal>
```

### With Loading State & Custom Button Text
```jsx
<CapModal
  title="Save Changes"
  visible={visible}
  onOk={handleSave}
  onCancel={handleCancel}
  okText="Save"
  closeText="Discard"
  confirmLoading={saving}
  cancelButtonType="secondary"
/>
```

### Custom Footer (or No Footer)
```jsx
<CapModal title="Preview" visible={visible} onCancel={handleCancel} footer={null}>
  <p>Content without default footer buttons</p>
</CapModal>
```

### Static Methods (Info / Success / Error / Warning)
```jsx
// Info dialog
CapModal.info({
  title: 'This is a notification message',
  content: <p>Some informational content here.</p>,
  onOk() {},
});

// Success dialog
CapModal.success({ title: 'Operation successful', content: 'Record saved.' });

// Error dialog
CapModal.error({ title: 'Something went wrong', content: 'Please try again.' });

// Warning dialog
CapModal.warning({ title: 'Warning', content: 'This action cannot be undone.' });
```
