
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DeliveryForm from '../../components/Cart/DeliveryForm';
import PaymentForm from '../../components/Cart/PaymentForm';
import { selectCartItems, selectCartTotal, clearCart } from '../../store/cartSlice';
import { createOrder } from '../../services/api';

// Container principal
const MainContainer = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 16px;
  min-height: 60vh;
`;

// Título da página
const PageTitle = styled.h1`
  color: ${theme.colors.primary};
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 32px;
`;

// Container do formulário
const FormContainer = styled.div`
  background-color: ${theme.colors.primary};
  padding: 32px;
  margin-bottom: 24px;
`;

// Mensagem de erro
const ErrorMessage = styled.p`
  color: #FFCCCC;
  font-size: 14px;
  padding: 16px;
  background-color: rgba(255, 0, 0, 0.1);
  margin-bottom: 16px;
  border: 1px solid #FFCCCC;
`;

// Mensagem de loading
const LoadingMessage = styled.p`
  color: ${theme.colors.primaryLight};
  font-size: 14px;
  padding: 16px;
  text-align: center;
`;

// Componente Checkout
function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Obtém dados do carrinho do Redux
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  // Estado do passo atual: 'delivery' | 'payment'
  const [step, setStep] = useState('delivery');
  
  // Estados dos formulários
  const [deliveryData, setDeliveryData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  
  // Estados de loading e erro
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Verifica se há itens no carrinho
  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <MainContainer>
          <PageTitle>Checkout</PageTitle>
          <ErrorMessage>Seu carrinho está vazio. Adicione itens antes de finalizar o pedido.</ErrorMessage>
        </MainContainer>
        <Footer />
      </>
    );
  }

  // Avança para pagamento
  const handleContinueToPayment = () => {
    setStep('payment');
  };

  // Volta para entrega
  const handleBackToDelivery = () => {
    setStep('delivery');
  };

  // Finaliza o pedido
  const handleFinishOrder = async (paymentFormData) => {
    try {
      setLoading(true);
      setError(null);
      setPaymentData(paymentFormData);

      // Prepara os dados do pedido conforme esperado pela API
      const orderData = {
        products: cartItems.map(item => ({
          id: item.id,
          price: item.price,
        })),
        delivery: {
          receiver: deliveryData.receiver,
          address: {
            description: deliveryData.address,
            city: deliveryData.city,
            zipCode: deliveryData.zipCode,
            number: parseInt(deliveryData.number),
            complement: deliveryData.complement || '',
          },
        },
        payment: {
          card: {
            name: paymentFormData.cardName,
            number: paymentFormData.cardNumber.replace(/\s/g, ''),
            code: parseInt(paymentFormData.cvv),
            expires: {
              month: parseInt(paymentFormData.expiryMonth),
              year: parseInt(`20${paymentFormData.expiryYear}`),
            },
          },
        },
      };

      // Faz o POST para a API
      const orderResponse = await createOrder(orderData);

      // Limpa o carrinho
      dispatch(clearCart());

      // Redireciona para a página de sucesso com os dados do pedido
      navigate('/order-success', {
        state: { orderData: orderResponse },
      });
    } catch (err) {
      setError(err.message || 'Erro ao finalizar pedido. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <MainContainer>
        <PageTitle>Entrega</PageTitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {step === 'delivery' && (
          <FormContainer>
            <DeliveryForm
              onContinue={handleContinueToPayment}
              onBack={() => navigate(-1)}
              initialData={deliveryData}
              onSaveData={setDeliveryData}
            />
          </FormContainer>
        )}

        {step === 'payment' && (
          <>
            <FormContainer>
              <PaymentForm
                onFinish={handleFinishOrder}
                onBack={handleBackToDelivery}
                total={cartTotal}
              />
            </FormContainer>
            {loading && <LoadingMessage>Processando pedido...</LoadingMessage>}
          </>
        )}
      </MainContainer>

      <Footer />
    </>
  );
}

export default Checkout;

