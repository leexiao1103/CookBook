const toggleAddBoard = state => ({ isAddBoardOpen: !state.isAddBoardOpen })
const toggleDelete = state => ({ isDeleteOpen: !state.isDeleteOpen })

export { toggleAddBoard, toggleDelete }