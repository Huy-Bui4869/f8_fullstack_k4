# Multi-Language website cùng NextJS

https://blog.haposoft.com/muiltiple-language-nextjs/

Tích hợp đa ngôn ngữ trên website là việc cần thiết để website của bạn trở nên rất thân thiện với người dùng ở các quốc gia trên thế giới. Bản thân React đã có rất nhiều thư viện hỗ trợ việc multiple language, tiêu biểu như i18n ,.. Với Next tất nhiên chúng ta cũng dùng được, nhưng hôm nay mình sẽ giới thiệu 1 cách đơn giản hơn để multiple language mà không cần tới thư viện ngoài với các dự án dùng Next. Gẹc gô!

Từ ver v10.0.0 bạn chỉ cần cung cấp danh sách các ngôn ngữ, ngôn ngữ mặc định và Nextjs sẽ tự động xử lí routing url cho bạn.

1. Bắt đầu bằng việc thêm config cho Nextjs để có thể tự động nhận ngôn ngữ thông qua url. Khởi tạo 1 project Next nhanh gọn tại đây.

Tiếp theo chúng ta sẽ tạo 1 file config: i18n.config.js:

```
    module.exports = {
    i18n: {
        locales: ['en', 'vi'],
        defaultLocale: 'en',
    },
}
```

Url mà ta thu được sẽ giống như này: http://example.com/[lang]

Trong đó lang là config trong locales, nếu bạn sử dụng 1 ngôn ngữ khác trong danh sách thì sẽ trả về 404 🥲

2. Tiếp đó ta cần import vào next.config.js để sử dụng được.

```
    const { i18n } = require('./i18n.config')

    module.exports = {
        i18n,
    }
```

Oke, có thể run lệnh: npm run dev hoặc yarn dev lên để thử nhé:

3. Tiếp theo chúng ta chỉ cần nạp data ngôn ngữ để project có thể sử dụng bằng cách tạo 2 file ngôn ngữ. Mình sẽ để chúng trong folder: public/lang/[lang].js

```
    export default {
        home: {
            title: 'Chào buổi sáng!',
            content: 'Chúc một ngày tốt lành',
        }
    }

    export default {
        home: {
            title: 'Morning!',
            content: 'Have a nice day',
        }
    }
```

4.Tiếp theo ta cần tạo thêm 1 hook phục vụ cho việc chuyển đổi ngôn ngữ khi đổi path:

```
    import { useRouter } from 'next/router'
    import en from '../../public/lang/en.js'
    import vi from '../../public/lang/vi.js'

    const useTrans = () => {
        const { locale } = useRouter()

        const trans = locale === 'vi' ? vi : en

        return trans
    }

    export default useTrans
```

Mục đích đơn giản chỉ để nhận biết đang chọn ngôn ngữ nào để lấy nội dung đó từ 2 file dịch chúng ta vừa tạo ra. Các bạn có thể tham khảo hoặc tùy biến nhé 🤡🤡

Tạo thử 1 component đơn giản nào:

```
    import styles from '../../styles/Home.module.css'
    import useTrans from '../hooks/useTrans'
    const Hello = () => {
        const trans = useTrans()

        return (
            <>
                <main className={styles.main}>
                    <h1 className={styles.title}>
                        { trans.home.title }
                    </h1>

                    <p className={styles.description}>
                        { trans.home.content }
                    </p>
                </main>
            </>
        )
    }

    export default Hello
```

Add components vào file index.js để thử ngay cho nóng.

Các bạn có thể tự xử và xem thành quả có đúng như mình mong đợi không nhé 😎😎 Mong là bài viết này đã giúp được các bạn phần nào trong việc xử lí đa ngôn ngữ với dự án dùng NextJS.
