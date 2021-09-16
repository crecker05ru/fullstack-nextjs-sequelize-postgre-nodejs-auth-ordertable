import Card from 'react-bootstrap/Card'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

export const FooterBar = () => {
    return(
        <>
              <footer className={styles.footer}>
        <a
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />

          </span>
        </a>
       
      </footer>
        <Card.Footer bsPrefix='card-footer' className="footer mt-auto py-3 bg-dark text-light fst-italic text-center" >App By Anvar</Card.Footer>
        </>
    )
}