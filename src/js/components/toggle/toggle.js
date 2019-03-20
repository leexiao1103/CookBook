const toggleAddBoard = state => ({ isAddBoardOpen: !state.isAddBoardOpen })
const toggleDelete = state => ({ toggleDelete: !state.toggleDelete })

export { toggleAddBoard, toggleDelete }