import {Appmain} from '../../index'
import { useRouter } from 'next/router'

export default function Username () {
    const router= useRouter()
    const {roomname,username} = router.query
    return <>
        <Appmain roomname={roomname} username={username}/>
    </>
}