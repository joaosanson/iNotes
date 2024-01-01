import prismaClient from '../prisma'

interface DeleteCustomerProps {
  id: string
}
class DeleteCustomerService {
  async execute({ id }: DeleteCustomerProps) {
    if (!id) {
      throw new Error('Solicitação Inválida.')
    }

    const findCustomer = await prismaClient.customer.findFirst({
      where: {
        id,
      },
    })

    if (!findCustomer) {
      throw new Error('Usuário não existe')
    }

    await prismaClient.customer.delete({
      where: {
        id: findCustomer.id,
      },
    })

    return { message: 'Deletado com sucesso!' }
  }
}

export { DeleteCustomerService }
