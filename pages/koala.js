import Image from "next/image";
import Link from 'next/link'
import Head from "next/head";
import { IMAGE_PATH, getSingletonData, getCollectionData, getListUsers, getImageData } from "lib/api"
import format from 'date-fns/format'

function IndexPage({ data, posts, popularPost }) {
	console.log(posts)
	return (
                <>
                <Head>
                        <title>{data.sitename}</title>
                        <meta
                        name="Description"
                        content={data.description}
                        />
                    </Head>

                    <nav className="uk-background-secondary uk-text-center uk-navbar-transparent uk-navbar" uk-navbar="true">
                        <div className="uk-width-1-5 uk-padding-small uk-navbar-left">
                        <ul className="uk-navbar-nav ">
                        <li className="uk-h2"><a href="/"><h2 className="uk-h2 uk-light">Blog Resensi</h2></a></li>    
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

    {posts.entries.map(post => (
        <div>
            <div calssName="uk-padding">
                <h2 className="uk-padding uk-text-center uk-card-title">{post.title}</h2>
            </div>
    
        
        <div className="uk-text-center">
            <Image
                    
                                src={IMAGE_PATH + post.image.path}
                                width={200}
                                height={280}
                            />
        </div>
        <div>
            <div>
                <p>{post.content}</p>
            </div>

        </div>
       

</div>
))}
                </>
            );
                                                }

export async function getStaticProps() {
	const data  = await getSingletonData("website");
	const posts = await getCollectionData("posts", "post", { filter: {published:true}, limit:1 });
	const popularPost = await getCollectionData("posts", "post", { filter: {published:true}, limit:1 });

    let count = 0;
	for (const posts of popularPost.entries) {
		const uploadedBy = posts._by
		const user = await getListUsers("post", { filter: {_id:uploadedBy}, limit:1 });

		popularPost.entries[count++].user = user
	}

	let count2 = 0;
	for (const postdata of posts.entries) {
		const imageId  = postdata.image._id
		const imageData = await getImageData("post", { src:imageId, m:"thumbnail", w:200, h:200 });

		posts.entries[count2++].imageData = imageData
	}

	return {
		props: {
			data,
			posts,
			popularPost,
		},
	}
}

export default IndexPage