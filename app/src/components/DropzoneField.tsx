import { FieldProps } from "formik";
import Dropzone from "react-dropzone";

import React from "react";

export const DropzoneField: React.FC<FieldProps<any>> = ({
  field: { onChange, name, ...field },
  form: { setFieldValue, ...form },
}) => {
  return (
    <Dropzone accept="image/*" onDrop={([file]) => setFieldValue(name, file)}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
};
