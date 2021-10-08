import { useRouter } from 'next/router';
import {Navbar,Container} from 'react-bootstrap';


export const NavigationBar = () => {
  const router = useRouter()
 return (
    <>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand >
                <div onClick={() => router.push('/')}>BikeBand Order Table</div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  </>
 )
}