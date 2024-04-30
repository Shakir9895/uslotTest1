import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';


// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'));
const OverviewEcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'));
const OverviewAnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'));
const OverviewBankingPage = lazy(() => import('src/pages/dashboard/banking'));
const OverviewBookingPage = lazy(() => import('src/pages/dashboard/booking'));
const OverviewFilePage = lazy(() => import('src/pages/dashboard/file'));
// PRODUCT
const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'));
const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'));
const ProductCreatePage = lazy(() => import('src/pages/dashboard/product/new'));
const ProductEditPage = lazy(() => import('src/pages/dashboard/product/edit'));
// ORDER
const OrderListPage = lazy(() => import('src/pages/dashboard/order/list'));
const OrderDetailsPage = lazy(() => import('src/pages/dashboard/order/details'));
// INVOICE
const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoice/list'));
const InvoiceDetailsPage = lazy(() => import('src/pages/dashboard/invoice/details'));
const InvoiceCreatePage = lazy(() => import('src/pages/dashboard/invoice/new'));
const InvoiceEditPage = lazy(() => import('src/pages/dashboard/invoice/edit'));
// USER
const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
const UserCardsPage = lazy(() => import('src/pages/dashboard/user/cards'));
const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const UserCreatePage = lazy(() => import('src/pages/dashboard/user/new'));
const UserEditPage = lazy(() => import('src/pages/dashboard/user/edit'));
// BLOG
const BlogPostsPage = lazy(() => import('src/pages/dashboard/post/list'));
const BlogPostPage = lazy(() => import('src/pages/dashboard/post/details'));
const BlogNewPostPage = lazy(() => import('src/pages/dashboard/post/new'));
const BlogEditPostPage = lazy(() => import('src/pages/dashboard/post/edit'));
// JOB
const JobDetailsPage = lazy(() => import('src/pages/dashboard/job/details'));
const JobListPage = lazy(() => import('src/pages/dashboard/job/list'));
const JobCreatePage = lazy(() => import('src/pages/dashboard/job/new'));
const JobEditPage = lazy(() => import('src/pages/dashboard/job/edit'));
// TOUR
const TourDetailsPage = lazy(() => import('src/pages/dashboard/tour/details'));
const TourListPage = lazy(() => import('src/pages/dashboard/tour/list'));
const TourCreatePage = lazy(() => import('src/pages/dashboard/tour/new'));
const TourEditPage = lazy(() => import('src/pages/dashboard/tour/edit'));
// FILE MANAGER
const FileManagerPage = lazy(() => import('src/pages/dashboard/file-manager'));
// APP
const ChatPage = lazy(() => import('src/pages/dashboard/chat'));
const MailPage = lazy(() => import('src/pages/dashboard/mail'));
const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'));
const KanbanPage = lazy(() => import('src/pages/dashboard/kanban'));
// TEST RENDER PAGE BY ROLE
const PermissionDeniedPage = lazy(() => import('src/pages/dashboard/permission'));
// BLANK PAGE
const BlankPage = lazy(() => import('src/pages/dashboard/blank'));

// ----------------------------------------------------------------------
//Uslot


//Batches
const Batches = lazy(() => import('src/pages/Uslot/Batches/batchDetails'));
const BatchDetails = lazy(() => import('src/pages/Uslot/Batches/batchmanagement'));
const StudentReports = lazy(() => import('src/pages/Uslot/Batches/studentReports'));


//Sessions
const Sessions = lazy(() => import('src/pages/Uslot/Sessions/Sessions'))


//usermanagement
const UserManagement = lazy(() => import('src/pages/Uslot/usermanagement/usermanagement'));
const NewUserManagement = lazy(() => import('src/pages/Uslot/usermanagement/creatnew'));
const SingleViewUserManagement = lazy(() => import('src/pages/Uslot/usermanagement/singleview'));



//teachermanagement
const TeacherManagement = lazy(() => import('src/pages/Uslot/teachermanagement/teachermanagement'));
const NewTeacherManagement = lazy(() => import('src/pages/Uslot/teachermanagement/createnewTeacher'));
const TeacherManagementProfile = lazy(() => import('src/pages/Uslot/teachermanagement/profileTeachermangmt'));
const TeachermngmtBatchDetails = lazy(() => import('src/pages/Uslot/teachermanagement/teachermngmtbatchDetails'));


//academics / CourseManagement
const CourseManagement = lazy(() => import('src/pages/Uslot/academics/coursemanagement/coursemanagement'));
const NewCourseManagement = lazy(() => import('src/pages/Uslot/academics/coursemanagement/newcoursemanagement'));
const SingleViewCourseManagement = lazy(() => import('src/pages/Uslot/academics/coursemanagement/singleviewcoursemgmt'))

const ModuleQuiz = lazy(() => import('src/pages/Uslot/academics/coursemanagement/modulequiz'))
const CreateModuleQuiz = lazy(()=>import('src/pages/Uslot/academics/coursemanagement/createmodulequizqustions'));


const CourseManagementNewModule = lazy(() => import('src/pages/Uslot/academics/coursemanagement/newmodule'))
const CourseManagementEditModule = lazy(() => import('src/pages/Uslot/academics/coursemanagement/editmodule'))
const CourseManagementNewQuestions = lazy(() => import('src/pages/Uslot/academics/coursemanagement/newquestions'))
const CourseManagementEditQuestions = lazy(() => import('src/pages/Uslot/academics/coursemanagement/editquestions'))

//CourseCategory
const CourseCategory = lazy(() => import('src/pages/Uslot/academics/coursecategory/coursecategory'));


// BatchManagement
const BatchManagement = lazy(() => import('src/pages/Uslot/academics/batchmanagement/batchmanagement'))
const NewBatchManagement = lazy(() => import('src/pages/Uslot/academics/batchmanagement/newbatchmanagement'))
const SingleViewBatchManagement = lazy(() => import('src/pages/Uslot/academics/batchmanagement/singleviewbatchmngmt'))
const BatchManagementModule = lazy(() => import('src/pages/Uslot/academics/batchmanagement/batchmanagementmodule'))


// predictandwin
const PredictandWin = lazy(()=>import('src/pages/Uslot/predictandwin/Predictandwin'))


//---------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      //-------------------------------------//


      // uslot path

      { element: <IndexPage />, index: true },

      // {path:"uslotdashboard",element:"uslotDashboard>>>>"},


      //Batches
      { path: 'batches', element: <Batches /> },
      { path: 'batchesDetails/:id', element: <BatchDetails /> },
      { path: 'studentReport/:id', element: <StudentReports /> },


      //Sessions
      { path: 'sessions', element: <Sessions /> },



      // usermanagement
      { path: 'usermanagement', element: <UserManagement /> }, //  /dashboard/usermanagement
      { path: 'usermanagement/new', element: <NewUserManagement /> }, // /dashboard/usermanagement/new
      { path: 'usermanagement/:id/edit', element: <SingleViewUserManagement /> }, // /dashboard/usermanagement/:id/edit



      //teachermanagement
      { path: 'teachermanagement', element: <TeacherManagement /> }, // /dashboard/teachermanagement
      { path: "teachermanagement/new", element: <NewTeacherManagement /> },  // /dashboard/teachermanagement/new
      { path: "teachermanagement/:id/profile", element: <TeacherManagementProfile /> },// /dashboard/teachermanagement/:id/profile
      { path: "teachermanagement/:id/batchdetails", element: <TeachermngmtBatchDetails /> },




      // academics /coursemanagement
      { path: "academics/coursemanagement", element: <CourseManagement /> },// /dashboard/academics/courseManagement
      { path: "academics/coursemanagement/new", element: <NewCourseManagement /> }, // /dashboard/academics/coursemanagement/new
      { path: "academics/coursemanagement/:id/edit", element: <SingleViewCourseManagement /> },


      { path: "academics/coursemanagement/modulequiz/:id", element: <ModuleQuiz /> },


      { path: 'academics/coursemanagement/newmodulequiz/newquestion/:id', element: <CreateModuleQuiz/> },


      { path: "academics/coursemanagement/newmodule", element: <CourseManagementNewModule /> },

      // { path: "academics/coursemanagement/module/:id/edit", element: "editModule" },
      { path: "academics/coursemanagement/module/:id/edit", element: <CourseManagementEditModule /> },
      { path: "academics/coursemanagement/newquestion", element: <CourseManagementNewQuestions /> },
      { path: "academics/coursemanagement/editquestion/:id", element: <CourseManagementEditQuestions /> },



      // academics /coursecategory
      { path: "academics/coursecategory", element: <CourseCategory /> },
      //  academics /batchManagement
      { path: "academics/batchmanagement", element: <BatchManagement /> },
      // academics/batchManagement/new
      { path: "academics/batchmanagement/new", element: <NewBatchManagement /> },
      // academics/batchManagement/:id/edit
      { path: "academics/batchmanagement/:id/edit", element: <SingleViewBatchManagement /> },

      // academics/batchManagement/module/:id/edit
      { path: "academics/batchmanagement/module/:id/edit", element: <BatchManagementModule /> },





      //predictandwin
      {path: "predictandwin",element:<PredictandWin/>},


      



      //------------------------------------------------------------//
      { element: <IndexPage />, index: true },
      { path: 'ecommerce', element: <OverviewEcommercePage /> },
      { path: 'analytics', element: <OverviewAnalyticsPage /> },
      { path: 'banking', element: <OverviewBankingPage /> },
      { path: 'booking', element: <OverviewBookingPage /> },
      { path: 'file', element: <OverviewFilePage /> },
      {
        path: 'user',
        children: [
          { element: <UserProfilePage />, index: true },
          { path: 'profile', element: <UserProfilePage /> },
          { path: 'cards', element: <UserCardsPage /> },
          { path: 'list', element: <UserListPage /> },
          { path: 'new', element: <UserCreatePage /> },
          { path: ':id/edit', element: <UserEditPage /> },
          { path: 'account', element: <UserAccountPage /> },
        ],
      },
      {
        path: 'product',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'list', element: <ProductListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'new', element: <ProductCreatePage /> },
          { path: ':id/edit', element: <ProductEditPage /> },
        ],
      },
      {
        path: 'order',
        children: [
          { element: <OrderListPage />, index: true },
          { path: 'list', element: <OrderListPage /> },
          { path: ':id', element: <OrderDetailsPage /> },
        ],
      },
      {
        path: 'invoice',
        children: [
          { element: <InvoiceListPage />, index: true },
          { path: 'list', element: <InvoiceListPage /> },
          { path: ':id', element: <InvoiceDetailsPage /> },
          { path: ':id/edit', element: <InvoiceEditPage /> },
          { path: 'new', element: <InvoiceCreatePage /> },
        ],
      },
      {
        path: 'post',
        children: [
          { element: <BlogPostsPage />, index: true },
          { path: 'list', element: <BlogPostsPage /> },
          { path: ':title', element: <BlogPostPage /> },
          { path: ':title/edit', element: <BlogEditPostPage /> },
          { path: 'new', element: <BlogNewPostPage /> },
        ],
      },
      {
        path: 'job',
        children: [
          { element: <JobListPage />, index: true },
          { path: 'list', element: <JobListPage /> },
          { path: ':id', element: <JobDetailsPage /> },
          { path: 'new', element: <JobCreatePage /> },
          { path: ':id/edit', element: <JobEditPage /> },
        ],
      },
      {
        path: 'tour',
        children: [
          { element: <TourListPage />, index: true },
          { path: 'list', element: <TourListPage /> },
          { path: ':id', element: <TourDetailsPage /> },
          { path: 'new', element: <TourCreatePage /> },
          { path: ':id/edit', element: <TourEditPage /> },
        ],
      },
      { path: 'file-manager', element: <FileManagerPage /> },
      { path: 'mail', element: <MailPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'kanban', element: <KanbanPage /> },
      { path: 'permission', element: <PermissionDeniedPage /> },
      { path: 'blank', element: <BlankPage /> },
    ],
  },
];
