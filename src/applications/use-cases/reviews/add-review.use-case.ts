import { AddReview, addReviewSchema } from '@/domains/entities/reviews/add-review.entity'
import DiTokens from '@/infrastructures/di-tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
class AddReviewUseCase {
  private reviewRepository: IReviewRepository

  constructor(@inject(DiTokens.ReviewRepository) reviewRepository: IReviewRepository) {
    this.reviewRepository = reviewRepository
  }

  async execute(payload: AddReview) {
    addReviewSchema.parse(payload)
  }
}

export default AddReviewUseCase
