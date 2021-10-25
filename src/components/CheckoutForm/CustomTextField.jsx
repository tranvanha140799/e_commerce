// import React from 'react';
// import { TextField, Grid } from '@material-ui/core';
// import { useFormContext, Controller } from 'react-hook-form';

// const FormInput = ({ name, label }) => {
//     const { control } = useFormContext();
//     return (
//         <Grid item xs={12} sm={6}>
//             <Controller
//                 render={({ field }) => (
//                     <TextField fullWidth label={label} />
//                 )}
//                 control={control}
//                 name={name}
//                 required
//             />
//         </Grid>
//     );
// };

// export default FormInput;

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

function FormInput({ name, label, required }) {
    const { control } = useFormContext();
    const isError = false;

    return (
        <Grid item xs={12} sm={6}>
            <Controller
                render={({ field }) => <TextField fullWidth label={label} />}
                defaultValue=""
                name={name}
                control={control}
                label={label}
                fullWidth
                required={required}
                error={isError}
            />
        </Grid>
    );
}

export default FormInput;
