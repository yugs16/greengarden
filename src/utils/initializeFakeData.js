const USERS = [
  {
    id: 1,
    name: 'Luffy',
    email: 'luffy@gmail.com',
    pwd: '12345'
  }
]

const LOANS = [
  {
    account: '1',
    amount: '3000',
    id: 1,
    name: 'Loan for bike',
    numberOfRepayments: 0,
    status: 'paid'
  },
  {
    account: '1',
    amount: '55000',
    id: 2,
    name: 'Loan for ship',
    numberOfRepayments: 10,
    status: 'unpaid'
  },
  {
    account: '1',
    amount: '15000',
    id: 3,
    name: 'Cook',
    numberOfRepayments: 3,
    status: 'unpaid'
  }
]

export default () => {
  const users = JSON.parse(localStorage.getItem('users')) || []
  const loans = JSON.parse(localStorage.getItem('loans')) || []

  if (!users.length)
    localStorage.setItem('users', JSON.stringify([...USERS, ...users]))
  if (!loans.length)
    localStorage.setItem('loans', JSON.stringify([...LOANS, ...loans]))
}
