import { graphql } from "gql.tada";

export const GetCategoriesQuery = graphql(`
  query GetCategories {
    categories {
      id
      name
      icon {
        url
      }
    }
  }
`);

export const GetBusinessByCategoryQuery = graphql(`
  query QueryPopularBusinessList($name: String) {
    businessLists(where: { category: { name: $name } }) {
      id
      name
      contactPerson
      address
      category {
        name
      }
      images {
        url
      }
    }
  }
`);

export const GetBusinessByIdQuery = graphql(`
  query BusinessByIdQuery($id: ID) {
    businessList(where: { id: $id }) {
      email
      contactPerson
      address
      about
      name
      category {
        name
      }
      images {
        url
      }
    }
  }
`);

export const GetSimilarBusinessByIdQuery = graphql(`
  query SimilarBusinessByIdQuery($id: ID, $name: String) {
    businessLists(where: { NOT: { id: $id }, AND: { category: { name: $name } } }) {
      id
      contactPerson
      address
      name
      images {
        url
      }
    }
  }
`);

export const CreateBookingMutation = graphql(`
  mutation CreateBookingMutation(
    $id: ID
    $date: String
    $time: String
    $userEmail: String
    $userName: String
  ) {
    createBooking(
      data: {
        bookingStatus: Booked
        businessList: { connect: { id: $id } }
        date: $date
        time: $time
        userEmail: $userEmail
        userName: $userName
      }
    ) {
      id
    }
    publishManyBookingsConnection(first: 300, to: PUBLISHED) {
      edges {
        node {
          id
        }
      }
    }
  }
`);

export const GetBookingsByBusinessIdQuery = graphql(`
  query BookingsByBusinessId($id: ID, $date: String) {
    bookings(where: { businessList: { id: $id }, date: $date }, first: 300) {
      date
      time
      bookingStatus
    }
  }
`);

export const GetUserBookingHistoryQuery = graphql(`
  query UserBookingHistory($userEmail: String, $status: ProgressStatus) {
    bookings(
      orderBy: publishedAt_DESC
      where: { userEmail: $userEmail, AND: { bookingStatus: $status } }
      first: 300
    ) {
      id
      businessList {
        name
        contactPerson
        address
        images {
          url
        }
      }
      date
      time
    }
  }
`);

export const UpdateBookingStatusMutation = graphql(`
  mutation ChangeBookingStatus($id: ID, $status: ProgressStatus) {
    updateBooking(data: { bookingStatus: $status }, where: { id: $id }) {
      id
    }
    publishBooking(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`);
