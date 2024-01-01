import prismaClient from '../prisma'

interface CreateCustomerProps {
  name: string
  email: string
}

class CreateCustomerService {
  async execute({ name, email }: CreateCustomerProps) {
    console.log('ROTA FOI CHAMADA')

    if (!name || !email) {
      throw new Error('Preencha todos os campos')
    }

    const customer = await prismaClient.customer.create({
      data: {
        name,
        email,
        status: true,
      },
    })

    return { customer }
  }
}

export { CreateCustomerService }
