# fastify-yup-schema

[![Version](https://img.shields.io/npm/v/fastify-yup-schema.svg)](https://www.npmjs.com/package/fastify-yup-schema)

fastify yup schema validator

## Installation

```bash
yarn add fastify-yup-schema
or
npm install fastify-yup-schema
```

## Usage

Set validator compiler

```js
import { createYupValidatorCompiler } from "fastify-yup-schema";

const yupValidatorCompiler = createYupValidatorCompiler();

fastify.setValidatorCompiler(yupValidatorCompiler);
```

Yup options are available and you can edit them

```js
const yupValidatorCompiler = createYupValidatorCompiler({...});
```

Create Yup Schema

```js
import { createYupSchema } from "fastify-yup-schema";

export const testSchema = createYupSchema((yup) => ({
  params: yup.object({ id: yup.string().required() }).required(),
}));
```

Create Yup Schema

```js
import { testSchema } from "../schemas";

fastify.get(
  "/:id",
  { schema: testSchema },
  ...
);
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
