// Schema de validação para o formulário de entrega
// Utiliza Zod para validação de dados

import { z } from 'zod';

// Schema de validação do formulário de entrega
const deliverySchema = z.object({
  // Campo obrigatório: nome do destinatário
  receiver: z
    .string()
    .min(1, 'Informe quem vai receber')
    .max(100, 'Nome muito longo'),

  // Campo obrigatório: endereço de entrega
  address: z
    .string()
    .min(1, 'Informe o endereço')
    .max(200, 'Endereço muito longo'),

  // Campo obrigatório: cidade
  city: z
    .string()
    .min(1, 'Informe a cidade')
    .max(100, 'Nome da cidade muito longo'),

  // Campo obrigatório: CEP (formato brasileiro)
  zipCode: z
    .string()
    .min(1, 'Informe o CEP')
    .regex(/^\d{5}-?\d{3}$/, 'CEP inválido (ex: 01234-567)'),

  // Campo obrigatório: número
  number: z
    .string()
    .min(1, 'Informe o número'),

  // Campo opcional: complemento
  complement: z
    .string()
    .max(100, 'Complemento muito longo')
    .optional(),
});

export default deliverySchema;
