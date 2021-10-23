import styles from '../styles/usersOnline.module.css'
export default function UsersOnline ({usersOnline}) {
    return (
        <div>
            <span className={styles.textColor_white}>Users online:</span>
                {usersOnline.map(u=> <div className={styles.userOnline}>{u}</div>)}
        </div>

    )
}