import gql from 'graphql-tag';

const GetUserTodos = gql`
query GetUserTodos($userId: uuid = "", $limit: Int = 3, $offset: Int = 0) {
  todos(where: {user_id: {_eq: $userId}}, limit: $limit, offset: $offset) {
    id
    text
    todo_user {
      name
    }
  }
  todos_aggregate {
    aggregate {
      count(columns: id)
    }
  }
}`;

export default GetUserTodos;
