import {Navbar,Container} from 'react-bootstrap';


export const NavigationBar = () => {
 return (
    <>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand >
                <div>BikeBand Order Table</div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  </>
 )
}