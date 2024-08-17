import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../../css/detail.css'

function SkeletonDetail() {
  return (
   <div className="detailBox">
      <>
       <div className="detailLeftBox">
          <Skeleton className="detailTitleSkeleton" />
          <div className="detailElementBox">
            <Skeleton className="detailElementSkeleton"/>
            <Skeleton className="detailElementSkeleton"/>
            <Skeleton className="detailElementSkeleton"/>
            <Skeleton className="detailElementSkeleton"/>          
            </div>
          <Skeleton className="detailOverviewSkeleton" />
          <Skeleton className="detailOverviewSkeleton"/>          
       </div>
        <div className="detailRightBox">
          <Skeleton className="detailPosterSkeleton"/>
       </div>
      </>
   </div>
  )
}

export default SkeletonDetail;