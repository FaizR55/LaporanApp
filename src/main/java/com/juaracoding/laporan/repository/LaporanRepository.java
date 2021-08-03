package com.juaracoding.laporan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.juaracoding.laporan.entity.Laporan;

public interface LaporanRepository extends JpaRepository<Laporan, Long> {

}
