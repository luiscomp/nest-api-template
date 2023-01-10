import * as Yup from 'yup';

export default class PlayerSchema {
  static readonly create = Yup.object().shape({
    name: Yup.string().required('O campo nome é obrigatório'),
  });

  static readonly update = Yup.object().shape({
    name: Yup.string().required('O campo nome é obrigatório'),
  });
}
