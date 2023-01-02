import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Post from 'App/Models/Post';
import PostValidator from "App/Validators/PostValidator";

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
        const payload = await request.validate(PostValidator);
        const input = request.all();

        const post = await Post.query().where('slug', params.slug).first();
        if (post) {
            post.title = input.title;
            post.content = input.content;

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
        const payload = await request.validate(PostValidator);
        const user = auth.use("api").user;

        const post = new Post();
        post.user_id = user.id;
        post.title = request.input('title');
        post.slug = request.input('slug');
        post.content = request.input('content');
        if (await post.save()) {
            return response.ok({
                data: post,
                message: 'success',
            })
        }
        return response.notFound({ message: 'Not found' })
    }

    public async destroy({ response, auth, request, params }: HttpContextContract) {

        const post = Post.query()
            .where('slug', params.slug)
            .where('user_id', auth.use("api").user.id);

        if (await post.first() && await post.delete()) {
            return response.ok({ message: 'Deleted successfully', })
        }

        return response.notFound({ message: 'Not found' })
    }
}
