import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Post from 'App/Models/Post';

export default class PostsController {

    public async index({ request, response }: HttpContextContract) {
        const posts = await Post.query().paginate(request.input('page', 1), 10);
        return response.ok({ data: posts, message: 'success', })
    }

    public async show({ params, response }: HttpContextContract) {
        const post = await Post.query().where('slug', params.slug).first();
        if (post) {
            return response.ok({ data: post, message: 'success' })
        }
        return response.notFound({ message: 'Not found' })
    }

    public async update({ params, response, request }: HttpContextContract) {
        const input = request.all();

        const post = await Post.query().where('slug', params.slug).first();
        if (post) {
            post.title = request.input('title');
            post.content = request.input('content');

            if (await post.save()) {
                return response.ok({
                    data: post,
                    message: 'success',
                })
            }
        }
        return response.notFound({ message: 'Not found' })
    }

    public async store({ auth, request, response }: HttpContextContract) {
        const user = await auth.authenticate();
        const post = new Post();
        post.title = request.input('title');
        // post.desc = request.input('desc');
        await post.save(post)
        return post
    }

    public async destroy({ response, auth, request, params }: HttpContextContract) {
        const user = await auth.authenticate();
        const post = await Post.query().where('id', params.id).delete();
        return response.json({ message: "Deleted successfully" })
    }
}
