import Users, { UserWithCompany } from '../Users/Users'

interface ICompanyUsersProps {
    users: UserWithCompany[]
}

export default function CompanyUsers(props: ICompanyUsersProps) {
    const { users } = props

    return (
        <>
            <Users users={users} />
        </>
    )
}
