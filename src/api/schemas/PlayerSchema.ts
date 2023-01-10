import * as Yup from 'yup';

export default class PlayerSchema {
  static readonly create = Yup.object().shape({
    name: Yup.string().required('O campo nome é obrigatório'),
    email: Yup.string()
      .email('O campo e-mail deve obedecer um formato válido')
      .required('O campo e-mail é obrigatório'),
    phone: Yup.string().required('O campo telefone é obrigatório'),
  });

  static readonly update = Yup.object().shape({
    name: Yup.string().required('O campo nome é obrigatório'),
    email: Yup.string()
      .email('O campo e-mail deve obedecer um formato válido')
      .required('O campo e-mail é obrigatório'),
    phone: Yup.string().required('O campo telefone é obrigatório'),
  });
}
