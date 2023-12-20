import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
    validator: (value) => {
        return value.length > 0;
    },
    message: ({ path }) => `Field ${path} empty`
});