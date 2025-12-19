// Schema de validação para o formulário de pagamento
// Utiliza Zod para validação de dados do cartão

import { z } from 'zod';

// Schema de validação do formulário de pagamento
const paymentSchema = z.object({
  // Nome impresso no cartão
  cardName: z
    .string()
    .min(1, 'Informe o nome no cartão')
    .max(100, 'Nome muito longo'),

  // Número do cartão (16 dígitos)
  cardNumber: z
    .string()
    .min(1, 'Informe o número do cartão')
    .regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, 'Número do cartão inválido'),

  // CVV (3 ou 4 dígitos)
  cvv: z
    .string()
    .min(1, 'Informe o CVV')
    .regex(/^\d{3,4}$/, 'CVV inválido (3 ou 4 dígitos)'),

  // Mês de vencimento (01-12)
  expiryMonth: z
    .string()
    .min(1, 'Informe o mês')
    .regex(/^(0[1-9]|1[0-2])$/, 'Mês inválido (01-12)'),

  // Ano de vencimento (2 dígitos)
  expiryYear: z
    .string()
    .min(1, 'Informe o ano')
    .regex(/^\d{2}$/, 'Ano inválido (ex: 25)'),
});

export default paymentSchema;
