import { Router } from "express";

const router = Router()

router.get('', getUser)
router.get('/:id', getAllUser)
router.post('', addUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)


export default router