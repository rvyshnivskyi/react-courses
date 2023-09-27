export const ToDoAction = ({action}) => (
    <tr>
        <td>{action.text}</td>
        <td>{action.isCompleted ? "Yes" : "No"}</td>
    </tr>
)