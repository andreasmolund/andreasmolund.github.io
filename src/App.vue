<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light px-3">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">{{ route.name }}</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Vorren</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/toposort" class="nav-link">Topo-sort</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/elcalc" class="nav-link">El-calc</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/f1" class="nav-link">F1</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container mt-4">
    <router-view />
  </div>

  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
</template>

<script>

</script>
