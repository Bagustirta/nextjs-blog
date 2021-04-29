import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image';
import { IMAGE_PATH, getSingletonData, getCollectionData, getListUsers, getImageData } from 'lib/api'
import format from 'date-fns/format'
import markdownToHtml from 'lib/markdownToHtml'
import Avatar from 'react-avatar';

function Post({ webInfo, data, content }) {
    return (
		<div>
            <Head>
                <title>{data.title} | {webInfo.sitename}</title>
                <meta
				name="Description"
				content={webInfo.description}
				/>
            </Head>

            <nav className="uk-background-secondary uk-text-center uk-navbar-transparent uk-navbar" uk-navbar="true">
                        <div className="uk-width-1-5 uk-padding-small uk-navbar-left">
                        <ul className="uk-navbar-nav ">
                        <li className="uk-h2"><a href="/"><h2 className="uk-h2 uk-light">Blog Jamal</h2></a></li>    
                            </ul>  
                       
                        </div>
                        <div className="uk-width-1-6 uk-padding-small uk-navbar-right uk-light">
                            
                                <span uk-icon="icon: menu; ratio: 2.0"></span>
                                    <div id="offcanvas-flip" uk-offcanvas="flip: true; overlay: true">
                                        <div className="uk-offcanvas-bar">
                                            <button className="uk-offcanvas-close" type="button uk-close" uk-close="true"></button>
                                            <h3>Title</h3>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                    </div>            
                        </div>
                    </nav>

          
                <div className="uk-container">
                            <h2 className="uk-padding">{data.title}</h2>
                        <div className="uk-align-center">
                            <Image
                                src={IMAGE_PATH + data.image.path}
                                alt={data.title}
                                width={280}
                                height={280}
                            />
                        </div>

                    <div className="uk-text-capitalis" dangerouslySetInnerHTML={{ __html: content }}></div>

                        <div className="uk-padding">
                            <a>
                                <Avatar name={data.user[0].name} size="50" round={true}  />
                                <span>
                                    <span className="uk-padding">{data.user[0].name}</span>
                                    <span className="">Author</span>
                                </span>
                            </a>
                        </div>

                    </div>
        
        </div>
    )
}

export async function getStaticPaths() {
    const posts = await getCollectionData("posts", "post", { filter: {published:true} });

    const paths = posts.entries.map((post) => ({
        params: { slug: post.title_slug },
    }))
    
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
	const webInfo = await getSingletonData("website");
    const post = await getCollectionData("posts", "post", { filter: {title_slug:params.slug} });
    const data = post.entries[0];

    const uploadedBy = post.entries[0]._by
    const user = await getListUsers("post", { filter: {_id:uploadedBy}, limit:1 });

    data.user = user;

    const content = await markdownToHtml(data.content)

  
    return { props: { webInfo, data, content } }
}

export default Post