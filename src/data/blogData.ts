// Define Post interface locally instead of importing
interface Post {
  id: number;
  title: string;
  content?: string; // Make content optional
  author: string;
  date: string;
  slug: string;
  isPublic?: boolean;
}

export const defaultPublicPost: Post = {
  id: 0,
  title: "Parallel muhit haqida",
  content: `<p>Muhit odamga ta'sir qiladi deyishadi.</p><p><a target="_blank" rel="noopener nofollow" class="external-link" href="https://www.google.com/url?sa=t&amp;source=web&amp;rct=j&amp;opi=89978449&amp;url=https://www.businessinsider.com/paypal-mafia-members-elon-musk-peter-thiel-reid-hoffman-companies&amp;ved=2ahUKEwj2qbjpitCKAxWCHxAIHVCxKqkQFnoECBgQAQ&amp;usg=AOvVaw05btEcPfNM5RD1EoPlrHUK">Paypal Mafia</a>ni ko'rib chiqaylik. 25 yil oldin ochilgan Paypal kompaniyasi bor. Uning ilk xodimlari hozir amerikaning eng muhim odamlari:</p><img src="https://publish-01.obsidian.md/access/cf494f05e31b6e09123c61413fc496eb/ln/Essays/pic6.jpeg" alt="pic6.jpeg" style="" draggable="true"><p><br>Adashmasam Laziz Adhamov bir videoda aytgandi, book clubimizga qarang - "qo'shilganlarning hammasi yigirma yilda millioner bo'ldi."<br>Harvard bitiruvchilarini ko'rsatishadi, bir necha Prezidentlar, katta tadbirkorlar chiqdi va o'zi ular ko'proq pul topishadi. Buxoroning Qorako'liga qarang - matematika bo'yicha birinchilikni berishmaydi. James Klir atom odatlarda yozgandi "11 yoshida aqlli bola bilan do'st bo'lgan, 15 yoshida boshqalardan aqlliroq bo'ladi" deb. Muhitning o'rni kattaligiga misollar to'xtamaydi.</p><p>Boshqa tarafdan esa Galton va Darvin muhit bir tiyin, genetika yutib ketadi degandi. Iqtisodchi Kaplan va biolog Plomin ham shu fikrda.</p><p>Men o'rta yo'l to'g'ri bo'lsa kerak deb o'ylayman. Balki olim bo'lishga irsiy moyilligi borlar, bekorchilar muhitida ko'p qola olmas. Shayximiz biografiyalarida bolalarga qo'shilib o'ynab yurmaganlari yozilgandi.</p><p>Noto'g'ri joyga tushib qolgan bola so'kinishlar, oxirgi memlar, yangicha pubg va minekraft taktikalari, mashhur tiktokchilar bilan tanishib olar. Kun kelib bu joy uniki emasligini tushunib, muhitdan qochib ketadi.</p><p>Maktabimizda grant suhbatida o'tiribman. Uzoq tumandan kelgan qiz navbati. Maktabidagi yagona ingliz tilini biladigan o'quvchi ekan. Sinfdoshlari maktabga zo'rg'a keladi. U esa bilimda o'qituvchilaridan ham o'tib ketgan ehtimol. O'zidan so'rasak - meni kitoblar va videolar qutqardi, deydi.</p><p>Qizimiz nega muhitning salbiy ta'siriga tushmadi? Balki sezgi a'zolarimizga ta'sir qiladigan hamma narsa muhit bo'lgani uchundir. Podkast, video, kitob, telegramda yozishmalar - ham muhit. Ko'rilayotgan kontent o'zgarsa, fikr o'zgaradi, fikr o'zgarsa harakat o'zgaradi. Muhit nafaqat atrofimizdagilar, balki miyamizdagi fikrlar. Mendleevni muhiti daholarniki bo'lmagan, o'n yettita farzandni ichida katta bo'lish, ko'r ota, tinmay ishlaydigan ona. Mehnatkashlik uchun hamma sabab bor, olimlik uchun-chi? Mark Avreliyni ilhomlantirgan Epiktet va Jahongir boshliq mo'g'ul armiyasiga qarshi urushgan Malik Ambar qul bo'lib tug'ilgandilar. Ularni ham miyasida alohida dunyolari bo'lgandir. Qizimiz maktabga jismoniy muhitini o'zgartirish uchun keldi, ungacha o'zi uchun parallel muhit qilib olgan edi.</p><p>Parallel muhit bir vaqtda ikkita (balki uchta) joyda bo'lishga imkon beradi. Qaysi biri sizniki ekanligini topish osonlashadi. O'zingizni muhitingizni topmaguningizcha noto'g'ri joyda yurganingizni bilmaysiz.<br>Andersenning xunuk o'rdakcha ertagini eslang. O'rdaklar uni masqaralab tinmasdi. Xunuk ko'ringani sababi esa u oqqush edi. Boshqa oqqushlarni ko'rishi bilan noto'g'ri joyda ekanligini tushundi.</p><p>Parallel muhit odamni qanday o'zgaritadi? Bir dunyo qog'oz uyumini tasavvur qiling. Ozgina cho'g' tushishi bilan yonib ketadi. O'rmondagi yong'inlarga ham qurib turgan daraxtlar sababchi deyishadi. Ho'l bo'lib turgan bo'lsa, ikkaloviga ham olov ta'sir qilmaydi. Irsiyati va ichidagi xohishi sabab <strong>boshqa muhit izlab yurganlarga - parallel muhit o'zgarish olib kela oladi</strong>. Balki shu sababdan Fuzayl ibn Iyoz o'zgarishi uchun birgina oyat yetarli bo'lgandi.</p><p>Bekorchilikka moyilligi borlar kuchli muhitda ko'p qola olmaydi. Tashqi o'zgarishlar - vaziyat majbur qilganidan bo'ladi. Marmeladni xohlagan shaklingizda ushlab turishingiz mumkin, qo'lingizni olishingiz bilan yana o'z holiga qaytadi. Ularga zo'r muhitlarda yurganlari yordam bermaydi, sog' olmalar, ichida qurti bor olmani tuzata olarmidi? Bir raqqos yigit otasi uni qorilarga qo'shib o'ttiz pora yodladganini gapirib bergandi. O'sha davrlarini zanjirband odamdek eslardi. Beli og'rib yurgani uchun direktorni otib o'ldirgan yigit UPenn va kuchli xususiy maktabning valediktoriani (eng a'lochisi) <a target="_blank" rel="noopener nofollow" class="external-link" href="https://www.businessinsider.com/luigi-mangione-unitedhealth-ceo-killing-person-what-to-know-2024-12">edi</a>. Rosuliga vaqtincha dushman bo'lgan - Ibn Abu Sarh eng yaxshi odamning kotibi edi.</p><p>Nechta byurokrat bilan ko'rishgan bo'lsam hammasida bir xillikni ko'rganman - gapi ko'p, ishi kam bo'ladi. Muhit ularni shu holatga olib kelganmikin, yoki ishdan ko'ra gapni qoyillatadiganlar shunaqa bitta joyga yig'ilib qolarmikin - menga qorong'u. Tayinli ish qilishga o'rgangan hamma tanishlarim byurokratiyada uzoq qolishmadi. O'z loyihalarini qilib yurishibdi. Muhit ularni sindira olmadi.</p><p>Asrimiz bizdan oldin hech kimga taqdim qilmayotgan imkoniyatlarni beryapti. Biz endi okean ortida yashasak ham bitta muhitda bo'la olamiz. Atrofingizga qarang. Qo'shningiz, qarindoshingiz, sinfdoshlaringizni hammasi bilan qanchalik yaqinsiz? Ko'pchiligi bilan tanamiz yaqin, o'ylarimiz emas. Boshqa tarafdan esa - qiziqishlar to'g'ri kelib qoldimi, bo'ldi, internetdagi begona bilan soatlik suhbatlar boshlanib ketadi.</p><p>Ba'zi ota-onalar keladi, bolam men bilan gaplashmaydi, o'zi juda kam gapiradi deydi. Qiziqishi mos bo'lgan o'rtoqlari bilan suhbatini kuzatamiz - elektr berilgan lampochkadek yonib ketadi. Mahalliy muhitlar o'rni tushib boryapti. Virtual muhitlar, parallel muhitlar o'rni ortyapti. Balaji bekorga yillardan beri <a target="_blank" rel="noopener nofollow" class="external-link" href="https://thenetworkstate.com/the-network-state-in-one-sentence">Network State</a> (Onlayn jamiyat) haqida gapirmayapti.</p><p>Yuz yil oldin, muhit topa olmay o'lib ketishi mumkin bo'lgan iqtidor, endi yashayotgan joyidan ketmay o'ziga o'xshaganlarni topa oladi.</p><p>Parallel muhit loyihasidan ham maqsad shu. Qidirib yurganlar uchun muhit bo'lish. O'zimga o'xshash odamlar bilan birga rivojlanish. O'xshashlik dunyoqarashlarda emas. Faqat bir turda fikrlaydigan odamlar yig'ilgan joy, boshida exo-kamera, oxirda esa kult bo'lib tugaydi. O'xshashlik prinsiplarda, qadriyatlarda, xohishlarda va ishga yondashuvda bo'lsin deyman.</p><p>Bu borada odam sonidan, o'xshashlik darajasi muhimroq. Video chiqishi bilan o'zimga izoh qoldirgandim. Insholar 50 ta odam bilan ham yozilaveradi.<br></p><img src="https://publish-01.obsidian.md/access/cf494f05e31b6e09123c61413fc496eb/ln/Essays/pic5.png" alt="pic5.png" style="filter: invert(0); width: 581px; margin: 0px auto;" draggable="true"><p>Sababi auditoriyadan kelib chiqib emas, o'zimdan kelib chiqib ijod qilish. Ko'pchilikka moslashish ijodkorni o'ldiradi. Videolarim ko'proq ko'rilsin deb Nikocado yillarini barbod <a target="_blank" rel="noopener nofollow" class="external-link" href="https://www.youtube.com/watch?v=wJa2thBJ8Fw&amp;pp=ygUQbmlrb2NhZG8gYXZvY2Fkbw%3D%3D">qildi</a>. Ya'ni 100 kilogram semirib ketdi, yolg'iz qoldi, bor iqtidorini ham yo'qotdi.</p><p>O'zi atrofimiz moslashishga to'lib yotibdi. Qarang bir xil kontent davrida yashamayapmizmi? Hamma podkastlar o'xshash, o'sha-o'sha mehmonlar aylangan, videolar bir xil olinayapti, kitob muqovasi va mavzular takror, klip, reels va kinolar esa faqat oldingilarning sikveli, refinement culture (sayqallangan madaniyat) xullas. Kontent olamiga sun'iy intellekt kirishi bu jarayonni faqat tezlashtiradi. Tushunish oson bo'lish uchun dunyo topiga chiqib ketgan Ozoda opaning jiguli klipiga qarang. Shundan keyin taksilarda faqat shunga o'xshash kliplarni ko'raverib charchadim. Adashmasam o'zlari ham keyingi qo'shiqlarini xuddi shu uslubda oldilar.</p><p>Video darslar, ovozli suhbatlar qilib tursak ham, Parallel Muhitda asosiy kontent matn bo'ladi. Meni bir isbotlanmagan nazariyam bor: yaqin kelajakni faqat katta va qiyin matnlarni tushunib, ular asosida ishlay oladiganlar quradi. Zamonamiz vizioneri Mask raketa qurish uchun shu mavzudagi hamma kitoblarni o'qib chiqgandi. Mashhur investorlar Manger va Baffet 500 betli hisobotlarni erinmay o'qishini aytib o'tgandi. Naval ham maktabini bitirishidan oldin mahalliy kutubxonani yeb bitirgandi.</p><p>Matn pishgan ovqatga o'xshaydi. Tayyorlash yeyishdan ancha qiyinroq. Osh ikki soatda pishadi, o'n daqiqada yeyiladi. Shunga yarasha bitta oshpaz ovqati, o'nlab, balki yuzlab odamga yetadi. Yaxshi pishgan taom chaynashdan vaqtni tejaydi. Tarixchi Ridleyning fikricha aynan olov va pishgan ovqat insoniyat rivojini tezlashtirdi. Shimpanzelar chaynashning o'ziga kuniga olti soat ketkazadi, odamlar ortib qolgan vaqtda boshqa ishlarni qilishadi. Yaxshi pishgan matn ham shunday. Muhim g'oyalarni tezda yetkazib beradi. Foydali matnga ketgan ozgina vaqt, ko'proq umrni tejab beradi.</p><p>Matnning yana bir ustunligi - uni o'qish uchun diqqat kerak bo'ladi. Zamonimizning diqqat ahvoliga qarang:</p><img src="https://publish-01.obsidian.md/access/cf494f05e31b6e09123c61413fc496eb/ln/Essays/pic4.png" alt="pic4.png" style="filter: invert(0); margin: 0px auto;" draggable="true"><p><br>Qiyin mavzuda bir daqiqa ham diqqat qilib bosh qotira olmaydigan odamlar orasida - 10 daqiqa diqqatni ushlab turish superkuchga aylanadi.</p><p>Endi muhitning nega pullik ekanligini gaplashsak. Menga daromad olib kelishi turgan gap. Shu sababli loyihaga jiddiy yondashishim ham aniq. Inshoni shu qismiga kelganda tushunib qoldim. Blogimda yil davomida ~10 000 ta so'z yozibman. Parallel muhitda shuning yarmiga keldik. Bu ketishda oy oxirida, blog uchun bir yilda ketgan vaqtdan ko'proq vaqt sarflagan bo'laman.</p><p>Loyihadagi kontent bepul kontentdan yaxshiroq bo'lmasa kerak. Shunchaki ko'proq bo'ladi. Blogda va Youtubeda biron nima o'rganganlar - bu yerdan ham o'rganadi. Yangilik olmaganlar bu yerdan ham olmaydi. Sababi - ommaga gapirganimda hech nimani berkitmayman. Bilganimni borini tushuntiraman. Ba'zi narsalarni aytmaganim - vaqt yetmaganidan bo'ladi.</p><p>O'quvchiga ham foydasi kam emas. Odam pul to'lagan narsasini qadrlaydi. E'tibor qildingizmi? Kanalda bo'lishish (share) ochib qo'yilgan. Kontentni bemalol istalgan odamga yubora olasiz (ha, bu rasmiy ruxsat). Bitta ogohlantirish bor faqat. Jo'natgan odamingiz ochib o'qimasligi mumkin. O'qisa ham sizdek foyda olmasligi mumkin. Sababi - u pul to'lamagan edi. Muhimlik prizmasi bilan qaramagan edi. Boya muhit haqida gaplashdik. Kontent ham muhit dedik. Rory Suzerland yozgandi - kontent ichida nimaga e'tibor berishimiz ham muhit. E'tibor berishni boshlashni eng tez yo'li esa - ozgina bo'lsa ham to'lash bo'ladi.</p><p>Ba'zilar kitob o'qib o'zgarmayotganidan nolib yuradi. Sotib olib o'qishni boshlasa edi, o'zgarishni ko'rardi. Ta'sir nafaqat muallif haqqida, balki e'tiborning kuchida hamdir. Revolver filmini shunchaki ko'rayotgan odam hech nima tushunmasa kerak. E'tibor berib ko'rganlar esa kibr bilan kurashish, uni yutish usullarini o'rganadi.</p><p>Muhitni o'zi bilan cheklanamizmi? Hech narsa o'rganmaymizmi? O'rganamiz. Bilganlarimni bo'lishib boraman. Ishlashni, boshqarishni, tadbirkorlikni, tandiqidy fikrlashni, auditoriya yig'ishni, risk olishni, yozishni, kitob o'qishni, dars o'tishni, tushuntirishni, ichki kurashni yengishni, hissiyot boshqarishni - hammasini o'rganamiz. Nafaqat biladiganlarim, kuzatadiganlarimni ham aytib ketaman. E'tiborlilar chamamda o'tgan insholardan buni sezib bo'lishdi.</p><p>Asli o'rgatmoqchi bo'lganimni hech birida eng zo'ri bo'lmasam kerak. Sohada eng usta bo'lganlar tiqilib yotibdi. Faqat bu ustalardan kamida ikki farqim bo'ladi - o'rgatishim hayotiy misol bilan kechadi, ya'ni tushunmaganga qo'ymayman. Ikkinchisi, o'rgatayotgan odam - oddiy shifokorlar oilasidan chiqqan siz kabi o'zbek o'g'loni bo'ladi. O'xshashlar bir biridan oson o'rganadi deyishadi.</p><p>Parallel Muhitga xush kelibsiz azizlar!</p>`,
  author: "Admin",
  date: new Date().toISOString().split("T")[0],
  slug: "haqida",
  isPublic: true,
};

export const blogPosts: Post[] = [
  {
    id: 1,
    title: "Getting Started with React",
    content: `<h2>Introduction to React</h2>
    <p>React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the DOM when data changes.</p>
    <h3>Key Features of React</h3>
    <ul>
      <li><strong>Virtual DOM</strong> - React creates a lightweight representation of the real DOM in memory.</li>
      <li><strong>JSX</strong> - A syntax extension that lets you write HTML-like markup inside JavaScript.</li>
      <li><strong>Component-Based</strong> - Build encapsulated components that manage their own state.</li>
    </ul>
    <blockquote>React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.</blockquote>
    <p>In this post, we'll cover the basics of React and how to set up your first React application.</p>`,
    author: "Admin",
    date: "2025-04-01",
    slug: "getting-started-with-react",
  },
  {
    id: 2,
    title: "Understanding React Hooks",
    content: `<h2>What are React Hooks?</h2>
    <p>React Hooks were introduced in React 16.8 to allow function components to use state and other React features without writing a class. The most common hooks are useState and useEffect.</p>
    <h3>The useState Hook</h3>
    <p>The useState hook lets you add React state to function components:</p>
    <pre><code>const [count, setCount] = useState(0);</code></pre>
    <h3>The useEffect Hook</h3>
    <p>The useEffect hook lets you perform side effects in function components:</p>
    <pre><code>useEffect(() => {
  document.title = \`You clicked \${count} times\`;
}, [count]);</code></pre>
    <p>In this tutorial, we'll explore how these hooks work and when to use them in your React applications.</p>`,
    author: "Admin",
    date: "2025-04-05",
    slug: "understanding-react-hooks",
  },
  {
    id: 3,
    title: "Building Responsive UIs with CSS Grid",
    content: `<h2>CSS Grid Layout</h2>
    <p>CSS Grid Layout is a powerful tool for creating complex responsive layouts. It allows you to define both columns and rows in your layout, making it easier to design web pages without using floats or positioning.</p>
    <h3>Basic Grid Setup</h3>
    <pre><code>.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}</code></pre>
    <p>This creates a three-column layout with equal width columns and 20px gaps between them.</p>
    <h3>Responsive Design with Grid</h3>
    <p>You can easily create responsive layouts using CSS Grid with media queries:</p>
    <pre><code>@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}</code></pre>
    <p>In this guide, we'll walk through creating a responsive grid-based layout for a blog site.</p>`,
    author: "Admin",
    date: "2025-04-10",
    slug: "building-responsive-uis-with-css-grid",
  },
];
