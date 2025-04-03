import { CaretDownOutlined } from '@ant-design/icons'
import styles from '../index.module.css'
export default function User() {
    return (
        <div className="flex items-center gap-4 flex-1">
            <div className="h-[40px] w-[40px]">
                <img src="./pikai.jpg" alt="" className="h-full w-full rounded-[20px] overflow-hidden cursor-pointer"/>
            </div>
            <div className="cursor-pointer">
                <span>irelia</span>
            </div>
            <CaretDownOutlined className={styles.icon}/>
        </div>
    )
  }
  