const userModel = require("../models/user");
const { object, string } = require("yup");

const getError = (errors, fieldName) => {
  if (errors.length) {
    errors = errors[0];
    return errors[fieldName];
  }
};

const getOld = (value, fieldName) => {
  if (value.length) {
    value = value[0];
    return value[fieldName];
  }
};

module.exports = {
  index: async (req, res, next) => {
    try {
      let { status, keyword } = req.query;
      const users = await userModel.all(status, keyword);
      // console.log(users);
      res.render("users/index", { users });
      //   res.json(users); //trả về file json để dễ kt.
    } catch (e) {
      return next(e);
    }
  },

  add: (req, res) => {
    const errors = req.flash("errors");
    const old = req.flash("old");

    res.render("users/add", {
      getError,
      errors,
      getOld,
      old,
    });
  },

  handleAdd: async (req, res) => {
    //yup
    const schema = object({
      email: string()
        .required("email bắt buộc phải nhập")
        .email("Nhập đúng định dạng email"),
      // .test("email_unique", "Email đã tồn tại", async (value) => {
      //   return await userModel.checkEmail(value);
      // }),
      name: string()
        .min(5, "tên phải từ 5 ký tự trở lên")
        .required("bắt buộc phải nhập name"),
    });

    try {
      const body = await schema.validate(req.body, { abortEarly: false });

      await userModel.add(body);
      return res.redirect("/users");
    } catch (e) {
      const errors = Object.fromEntries(
        e.inner.map((item) => [item.path, item.message])
      );

      console.log(errors);

      req.flash("errors", errors);
      req.flash("old", req.body);

      return res.redirect("/users/add");
    }
  },

  edit: (req, res) => {
    // const id = req.params.id;
    const errors = req.flash("errors");
    const old = req.flash("old");
    const body = req.body;
    console.log(body);

    res.render("users/edit", {
      getError,
      errors,
      getOld,
      old,
      body,
    });
    // await userModel.edit(id);
  },

  handleEdit: async (req, res) => {
    const id = req.params.id;
    //yup
    const schema = object({
      email: string()
        .required("email bắt buộc phải nhập")
        .email("Nhập đúng định dạng email"),
      // .test("email_unique", "Email đã tồn tại", async (value) => {
      //   return await userModel.checkEmail(value);
      // }),
      name: string()
        .min(5, "tên phải từ 5 ký tự trở lên")
        .required("bắt buộc phải nhập name"),
    });

    try {
      const body = await schema.validate(req.body, { abortEarly: false });
      console.log("body", body); // {name: '...', email: '...',}
      await userModel.edit(body, id);
      return res.redirect("/users");
    } catch (e) {
      console.log(e);
      // const errors = Object.fromEntries(
      //   e.inner.map((item) => [item.path, item.message])
      // );

      // req.flash("errors", errors);
      // req.flash("old", req.body);
      return res.redirect("/users/edit");
    }
  },

  delete: async (req, res) => {
    const id = req.params.id;

    if (id) {
      await userModel.delete(id);
      res.redirect("/users");
    }
  },
};
