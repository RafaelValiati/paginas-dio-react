import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import user from '../../assets/user.svg'

import { useForm } from "react-hook-form";


import { Container, Title, Column, ColumnForm, TitleLogin, SubtitleLogin, EsqueciText, CriarText, Row, Wrapper } from './styles';

const Cadastro = () => {

    const navigate = useNavigate()

    const handleClickLogin = () => {
        navigate('/login')
      }

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try {
          const response = await api.post('/users', formData); // Replace '/users' with your actual registration endpoint
          if (response.data.id) {
            navigate('/feed'); // Or another page after successful registration
            return;
          }
          alert('Registration failed. Please try again.');
        } catch (e) {
          console.error('Error during registration:', e);
          alert('An error occurred. Please try again later.');
        }
      };

    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <ColumnForm>
                <Wrapper>
                <TitleLogin>Comece agora grátis</TitleLogin>
                <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="Nome" leftIcon={<MdPerson />} name="nome"  control={control} />
                    <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} />
                    <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  name="senha" control={control} />
                    {errors.senha && <span>Senha é obrigatório</span>}
                    <Button title="Criar minha conta" variant="secondary" type="submit"/>
                </form>
                <Row>
                    <p>Já tenho conta. <a href="#" onClick={handleClickLogin}>Fazer login</a></p>
                    
                </Row>
                </Wrapper>
            </ColumnForm>
        </Container>
    </>)
}

export { Cadastro }