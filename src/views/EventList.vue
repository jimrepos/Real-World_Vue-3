<template>
  <div class="events">
    <h1>Events For Good</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <router-link
        :to="{ name: 'EventList', query: { page: page - 1, perPage: perPage } }"
        rel="prev"
        id="page-prev"
        v-if="page > 1"
      >&laquo; Previous</router-link>
      <ul class="pages">
        <li v-for="pageNumber in totalPages" :key="pageNumber">
          <router-link
            :to="{ name: 'EventList', query: { page: pageNumber, perPage: perPage } }"
            :id="('page-' + pageNumber)"
            class="page"
            :class="pageNumber === page ? 'active-page' : ''"
          >{{ pageNumber }}</router-link>
        </li>
      </ul>
      <router-link
        :to="{ name: 'EventList', query: { page: page + 1, perPage: perPage } }"
        rel="next"
        id="page-next"
        v-if="hasNextPage"
      >Next &raquo;</router-link>
    </div>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import { watchEffect } from 'vue'

export default {
  name: 'EventList',
  props: ['page', 'perPage'],
  components: {
    EventCard
  },
  data() {
    return {
      events: null,
      totalEvents: 0
    }
  },
  created() {
    watchEffect(() => {
      this.events = null;
      EventService.getEvents(this.perPage, this.page)
        .then(response => {
          this.events = response.data
          this.totalEvents = response.headers['x-total-count']
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            this.$router.push({
                name: '404Resource',
                params: {
                    resource: 'events'
                }
            });
          } else {
            this.$router.push({
              name: 'NetworkError'
            });
          }
        })
      })
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalEvents / this.perPage);
    },
    hasNextPage() {
      return this.totalPages > this.page;
    }
  }
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}

.pagination ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0 3em;
  width: 100%;
}

.pagination ul li {
  flex: 1;
  padding: 0 1em;
}

.pagination a {
  flex: 1;
}

.pagination a.active-page {
  color: #42b983;
}

#page-prev, #page-next {
  white-space: nowrap;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
