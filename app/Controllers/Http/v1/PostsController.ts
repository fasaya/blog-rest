import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Post from 'App/Models/Post';

export default class PostsController {

    public async index({ request }: HttpContextContract) {
        const posts = await Post.query();
        return posts
    }

    public async show({ request, params }: HttpContextContract) {
        try {
            const post = await Post.find(params.id);
            if (post) {
                return post
            }
        } catch (error) {
            console.log(error)
        }
    }

    public async update({ auth, request, params }: HttpContextContract) {
        const post = await Post.find(params.id);
        if (post) {
            post.title = request.input('title');
            post.content = request.input('desc');
            post.done = request.input('done')

            if (await post.save()) {
                return post
            }
            return; // 422
        }
        return; // 401
    }

    public async store({ auth request, response }: HttpContextContract) {
        const user = await auth.authenticate();
        const post = new Post();
        post.title = request.input('title');
        post.desc = request.input('desc');
        await post.save(post)
        return post
    }

    public async destroy({ response, auth, request, params }: HttpContextContract) {
        const user = await auth.authenticate();
        const post = await Post.query().where('id', params.id).delete();
        return response.json({ message: "Deleted successfully" })
    }
}
